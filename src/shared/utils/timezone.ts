import { toZonedTime, format } from 'date-fns-tz';

/**
 * Converte uma data UTC para o timezone UTC-3 (America/Sao_Paulo).
 * @param date Date | string | number - Data em UTC
 * @param formatStr string - Formato de saída (opcional)
 * @returns string | Date
 */
export function toUTC3(date: Date | string | number, formatStr?: string): string | Date {
  const timeZone = 'America/Sao_Paulo';
  const zonedDate = toZonedTime(date, timeZone);
  if (formatStr) {
    return format(zonedDate, formatStr, { timeZone });
  }
  return zonedDate;
} 