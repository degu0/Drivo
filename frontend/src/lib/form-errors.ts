import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { ActionResult } from '@/lib/action-result';

export function applyFieldErrors<T extends FieldValues>(
  result: ActionResult | undefined,
  setError: UseFormSetError<T>,
) {
  if (!result || !('error' in result) || !result.fieldErrors) return;

  Object.entries(result.fieldErrors).forEach(([field, message], index) => {
    setError(
      field as Path<T>,
      { type: 'server', message },
      { shouldFocus: index === 0 },
    );
  });
}
