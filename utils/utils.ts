export function translateMessage(message: string): string {
    const translations: { [key: string]: string } = {
        "Failed to fetch": "Error al obtener los datos"
    };

    return translations[message] || message;
}