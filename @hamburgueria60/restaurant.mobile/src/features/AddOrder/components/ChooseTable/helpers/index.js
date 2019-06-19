export function getEmptyCellsAmount(total) {
    const perLine = Math.floor((window.innerWidth - 16) / (64 + 16));
    if (perLine >= total) return 0;
    if (total % perLine === 0) return 0;

    const value = Math.max(0, perLine - (total % perLine));
    return Number.isNaN(value) ? 0 : value;
}
