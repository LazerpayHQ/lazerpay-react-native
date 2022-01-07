const isRequired = (name: string, isValid: boolean) => {
  if (isValid) return;
  console.error(`${name} is required`);
};

export { isRequired };
