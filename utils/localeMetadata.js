
const metadata = require("../metadata.json");
const getMetadataByLocale = (locale) => {
    if(!locale) {
        return {
            locale: null,
            metadata: metadata['default']
        };
    }
    // Check if there is an exact match for the requested locale
    if (metadata.languages.hasOwnProperty(locale)) {
        return {
            locale: locale,
            metadata: metadata.languages[locale]
        };
    }

    // Check if there is a fallback language for the requested locale
    const language = locale.split('-')[0].toLowerCase();
    if (metadata.fallbacks.hasOwnProperty(language)) {
        const fallbackLocale = metadata.fallbacks[language];
        if (metadata.languages.hasOwnProperty(fallbackLocale)) {
            return {
                locale: fallbackLocale,
                metadata: metadata.languages[fallbackLocale]
            };
        }
    }

    // Return default metadata if no matching locale or fallback found
    return {
        locale: null,
        metadata: metadata['default']
    };
}

const getLocales = () => {
    const locales = { default: metadata.default.locale_name }
    for(const [key, { locale_name }] of Object.entries(metadata.languages)) {
        locales[key] = locale_name
    }
    return locales;
}

module.exports = {
    getMetadataByLocale, getLocales
}