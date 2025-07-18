export function extractYear(date: string): string {
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return date.split('/')[2];
  }
  return date;
}
