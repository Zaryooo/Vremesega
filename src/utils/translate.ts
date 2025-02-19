export const getMonthInCyrillic = (month: string) => {
    switch (month.toLowerCase()) {
        case 'january':
            return 'Януари';
        case 'february':
            return 'Февруари';
        case 'march':
            return 'Март';
        case 'april':
            return 'Април';
        case 'may':
            return 'Май';
        case 'june':
            return 'Юни';
        case 'july':
            return 'Юли';
        case 'august':
            return 'Август';
        case 'september':
            return 'Септември';
        case 'october':
            return 'Октомври';
        case 'november':
            return 'Ноември';
        case 'december':
            return 'Декември';
        default:
            return month; // Return the original month if not found
    }
}