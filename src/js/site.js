(function () {
  function initMenus() {
    document.querySelectorAll("[data-menu-btn]").forEach(function (button) {
      const targetSelector = button.getAttribute("data-menu-target");
      const menu = targetSelector
        ? document.querySelector(targetSelector)
        : null;
      const openIcon = button.querySelector("[data-menu-open]");
      const closeIcon = button.querySelector("[data-menu-close]");

      if (!menu) return;

      button.addEventListener("click", function () {
        const isOpen = menu.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));

        if (openIcon) openIcon.hidden = isOpen;
        if (closeIcon) closeIcon.hidden = !isOpen;
      });
    });
  }

  function initReveal() {
    const items = Array.from(document.querySelectorAll(".reveal"));

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("in");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initMortgageCalculators() {
    const currency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    document.querySelectorAll("[data-mortgage-calculator]").forEach(function (calculator) {
      const form = calculator.querySelector("[data-mortgage-form]");
      const error = calculator.querySelector("[data-mortgage-error]");
      if (!form) return;

      function setText(selector, value) {
        const output = calculator.querySelector(selector);
        if (output) output.textContent = currency.format(value);
      }

      function calculate(event) {
        if (event) event.preventDefault();

        const data = new FormData(form);
        const price = Number(data.get("price"));
        const downPayment = Number(data.get("downPayment"));
        const annualRate = Number(data.get("rate"));
        const years = Number(data.get("term"));
        const annualTax = Number(data.get("propertyTax"));
        const annualInsurance = Number(data.get("insurance"));
        const hoa = Number(data.get("hoa"));
        const values = [price, downPayment, annualRate, years, annualTax, annualInsurance, hoa];

        if (values.some(function (value) { return !Number.isFinite(value) || value < 0; }) || price <= 0 || years <= 0) {
          error.textContent = "Enter valid, non-negative values to calculate a payment.";
          error.hidden = false;
          return;
        }

        if (downPayment >= price) {
          error.textContent = "The down payment must be less than the home price.";
          error.hidden = false;
          return;
        }

        error.hidden = true;
        const loanAmount = price - downPayment;
        const paymentCount = years * 12;
        const monthlyRate = annualRate / 100 / 12;
        const principalAndInterest = monthlyRate === 0
          ? loanAmount / paymentCount
          : loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, paymentCount)) /
            (Math.pow(1 + monthlyRate, paymentCount) - 1);
        const monthlyTax = annualTax / 12;
        const monthlyInsurance = annualInsurance / 12;
        const total = principalAndInterest + monthlyTax + monthlyInsurance + hoa;

        setText("[data-mortgage-total]", total);
        setText("[data-mortgage-pi]", principalAndInterest);
        setText("[data-mortgage-tax-result]", monthlyTax);
        setText("[data-mortgage-insurance-result]", monthlyInsurance);
        setText("[data-mortgage-hoa-result]", hoa);
        setText("[data-mortgage-loan]", loanAmount);
      }

      form.addEventListener("submit", calculate);
      form.addEventListener("input", calculate);
      calculate();
    });
  }

  function initSite() {
    initMenus();
    initReveal();
    initMortgageCalculators();
  }

  document.addEventListener("DOMContentLoaded", initSite);
  window.initSite = initSite;
})();
