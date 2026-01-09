export const getEnvVar = (name: string): string | undefined => {
  return import.meta.env[`VITE_${name}`];
};

export const getEnvVarOrDefault = (
  name: string,
  defaultValue: string,
): string => {
  const envVar = getEnvVar(name);
  if (typeof envVar === "undefined") {
    return defaultValue;
  }
  return envVar;
};
