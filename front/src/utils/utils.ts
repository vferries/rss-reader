const fr = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

export const toFrenchLocale = (date: string) => fr.format(new Date(date));
