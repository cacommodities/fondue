function getCountryFlagUrl(countryCode: string): string {
  const code = countryCode.toLowerCase();
  return `https://cdn.jsdelivr.net/npm/flag-icons/flags/4x3/${code}.svg`;
}

export function Flag({
  countryCode,
  className,
}: {
  countryCode: string;
  className?: string;
}) {
  const src = getCountryFlagUrl(countryCode);
  return (
    <img
      src={src}
      alt={countryCode}
      title={countryCode}
      loading="lazy"
      decoding="async"
      className={className ?? "size-5"}
    />
  );
}
