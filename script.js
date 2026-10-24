const conditionButtons = document.querySelectorAll(".condition-item");
const conditionContents = document.querySelectorAll(".condition-content");
const contentPanel = document.getElementById("content-panel");

function showCondition(selectedButton) {
    const selectedContent = document.getElementById(selectedButton.dataset.condition);
    if (!selectedContent) return;

    conditionButtons.forEach((button) => {
        const isSelected = button === selectedButton;
        button.classList.toggle("active", isSelected);

        if (isSelected) {
            button.setAttribute("aria-current", "true");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    conditionContents.forEach((section) => {
        section.classList.toggle("active", section === selectedContent);
    });

    // Return the right panel to the top when switching conditions
    contentPanel.scrollTop = 0;
}

conditionButtons.forEach((button) => {
    button.addEventListener("click", () => showCondition(button));
});

document.querySelectorAll("[data-goto]").forEach((link) => {
    link.addEventListener("click", () => {
        const target = document.querySelector(
            `.condition-item[data-condition="${link.dataset.goto}"]`
        );
        if (target) target.click();
    });
});

const tooltip = document.createElement("div");
tooltip.className = "tooltip";
tooltip.setAttribute("role", "tooltip");
document.body.appendChild(tooltip);

const TOOLTIP_MARGIN = 8;

function showTooltip(term) {
    tooltip.textContent = term.dataset.definition;

    // Reset position so the tooltip measures at its natural size
    tooltip.style.left = "0px";
    tooltip.style.top = "0px";

    const termRect = term.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();

    // Center over the term, then keep inside the window
    let left = termRect.left + termRect.width / 2 - tipRect.width / 2;
    left = Math.max(
        TOOLTIP_MARGIN,
        Math.min(left, window.innerWidth - tipRect.width - TOOLTIP_MARGIN)
    );

    // Above the term, or below if there isn't room
    let top = termRect.top - tipRect.height - TOOLTIP_MARGIN;
    if (top < TOOLTIP_MARGIN) {
        top = termRect.bottom + TOOLTIP_MARGIN;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.classList.add("visible");
}

function hideTooltip() {
    tooltip.classList.remove("visible");
}

document.addEventListener("mouseover", (event) => {
    const term = event.target.closest(".term");
    if (term) showTooltip(term);
});

document.addEventListener("mouseout", (event) => {
    if (event.target.closest(".term")) hideTooltip();
});

document.addEventListener("focusin", (event) => {
    const term = event.target.closest(".term");
    if (term) showTooltip(term);
});

document.addEventListener("focusout", (event) => {
    if (event.target.closest(".term")) hideTooltip();
});

// Hide when anything scrolls or resizes, so it never floats away from its term
document.addEventListener("scroll", hideTooltip, true);
window.addEventListener("resize", hideTooltip);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideTooltip();
});