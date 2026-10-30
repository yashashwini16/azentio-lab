export interface ScanResult {
  hasSensitiveData: boolean;
  warnings: string[];
  suggestedRedaction: string;
}

export function scanSensitiveData(text: string): ScanResult {
  const warnings: string[] = [];
  let sanitized = text;

  // 1. Account / Customer Reference Numbers
  const accountRegex = /\b(AC-\d+|ACC\d+|[A-Z]{2}\d{6,12}|\b\d{8,16}\b)\b/gi;
  if (accountRegex.test(text)) {
    warnings.push('Potentially sensitive account or customer reference number identified.');
    sanitized = sanitized.replace(accountRegex, '[ACCOUNT-REDACTED]');
  }

  // 2. Specific contract references (e.g. "Murabaha 7712-A")
  const contractRegex = /\b(contract|ref|case|ticket)\s*#?\s*([A-Za-z0-9\-]+)/gi;
  if (contractRegex.test(text)) {
    warnings.push('Contract or ticket reference number detected.');
    sanitized = sanitized.replace(contractRegex, '$1 [REF-MASKED]');
  }

  // 3. Exact high-value currency figures
  const currencyRegex = /(\$|€|£|USD|AED|GBP|EUR|SGD)\s*\d{1,3}(,\d{3})+(\.\d+)?/gi;
  if (currencyRegex.test(text)) {
    warnings.push('Exact institutional financial figure detected (risk of differencing identification).');
    sanitized = sanitized.replace(currencyRegex, '[AMOUNT-NORMALIZED]');
  }

  // 4. Specific corporate client names / indicators
  const corporateIndicators = /\b(BuildCorp\s*UK|Thames\s*Infra|PetroCorp|GlobalLogistics\s*Ltd)\b/gi;
  if (corporateIndicators.test(text)) {
    warnings.push('Client corporate identity pattern detected.');
    sanitized = sanitized.replace(corporateIndicators, '[CLIENT-ORGANIZATION]');
  }

  // 5. Sensitive credentials / emails / keys
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  if (emailRegex.test(text)) {
    warnings.push('Email address detected in observation body.');
    sanitized = sanitized.replace(emailRegex, '[EMAIL-REDACTED]');
  }

  return {
    hasSensitiveData: warnings.length > 0,
    warnings,
    suggestedRedaction: sanitized
  };
}
