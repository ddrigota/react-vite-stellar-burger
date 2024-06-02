import translate from "translate";

translate.engine = "deepl";
translate.key = import.meta.env.VITE_DEEPL_KEY;

export default async function translateText(text: string) {
  const translatedText = await translate(text, { from: "ru", to: "en" });
  return translatedText;
}
