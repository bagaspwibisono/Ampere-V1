const config = require("../config");

module.exports = {
	Translate: async (text = "", lang = "", allLowerCase = false) => {
		let output;
		let wait_time = config.app?.Translate_Timeout;

		let reg = /<([^>]+)>/g;

		if (!translate) {
			console.warn("❌ Warning ! Modul terjemah ❌");
			output = getUnchangedText(text);
			return output;
		}

		// Apparently doing this searches it without crashing. Damn
		!lang ? (lang = config.app?.lang) : (lang = lang);

		if (!text || !lang) throw new Error("❌ Text Di butuhkan");

		if (lang === "id") {
			output = getUnchangedText(text);
		} else {
			const arrayStr = text.split(reg);
			const translatedArray = await Promise.all(
				arrayStr.map(async (str, index) => {
					if (index % 2 == 0) {
						if (verifyLang(lang)) {
							try {
								let Tranlate_buff;

								if (wait_time) {
									const timeout = new Promise((resolve, reject) => {
										setTimeout(() => {
											reject(
												new Error(
													"❗ TimeoutRaisedError: Terjemah Timeout SKIP... ❗"
												)
											);
										}, wait_time);
									});
									Tranlate_buff = await Promise.race([
										translate(str, lang),
										timeout,
									]);
								} else {
									Tranlate_buff = await translate(str, lang);
								}

								if (!allLowerCase) return Tranlate_buff;
								return Tranlate_buff.toLowerCase();
							} catch (e) {
								return getUnchangedText(str);
							}
						} else {
							console.clear();

							genConfigError(
								"app",
								"lang",
								`❌ Bahasa tidak valid, cek file config ❌
            \t\t\tubah file config...\n`
							);
						}
					} else {
						return getUnchangedText(str);
					}
				})
			);
			output = translatedArray.join(" ");
		}

		return output;
	},

	GetTranslationModule: async () => {
		try {
			const module = await import("translate");
			translate = module.default || module;
		} catch (e) {
			throw new Error(`❌ Terjemah tidak terload... ❌ \n\n\nError:${e}`);
		}
	},

	throwConfigError: (section = "app", key = "token", error = "") => {
		genConfigError(section, key, error);
	},
};

function verifyLang(lang) {
	const langs = ["id", "en"];
	return langs.includes(lang);
}

function getUnchangedText(text) {
	return text
		.replace(/<<@(\d+)>>/g, "<@$1>")
		.replace(/>/g, "")
		.replace(/</g, "")
		.replace(/@(\w+)/g, "<@$1>");
}

function genConfigError(dict = "app", key = "token", error = "") {
	try {
		let config = require("../config");

		if (!config[dict]) {
			throw new Error(
				`\n\n❌ The ${dict} Obeject (?) Tidak ada di config! ❌\n\n`
			);
		}
		if (!config[dict][key]) {
			throw new Error(
				`\n\n❌ Key > ${key} tidak ditemuakan di ${dict} object config ❌\n\n`
			);
		}

		(async () => {
			class colors {
				constructor() {}
				red(str) {
					return "\u001b[31m" + str;
				}
				green(str) {
					return "\u001b[32m" + str;
				}
				yellow(str) {
					return "\u001b[33m" + str;
				}
				blue(str) {
					return "\u001b[34m" + str;
				}
				magenta(str) {
					return "\u001b[35m" + str;
				}
				cyan(str) {
					return "\u001b[36m" + str;
				}
				white(str) {
					return "\u001b[37m" + str;
				}
				reset(str) {
					return "\u001b[0m" + str;
				}
			}
			const color = new colors();
			console.error(
				color.red(`\n
        ${error}\n`) +
					color.white(`${dict}: `) +
					color.magenta(`{`)
			);

			for (let [k, v] of Object.entries(config[dict])) {
				console.error(
					color.green(`\t${k}: `) +
						(k != key
							? color.blue(`'${v}'`)
							: color.yellow(`> > >`) +
							  color.red(`'${v}'`) +
							  color.yellow(`< < <`))
				);
			}
			console.error(color.magenta(`},`));
			console.error(color.reset(`\n`));
			process.exit(1);
		})();
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}
