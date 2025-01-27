


export const getQueryString = (data: {[key:string]: any}): string => {
    return new URLSearchParams(
        Object.entries(data).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = String(value); // Приведення значення до рядка
            }
            return acc;
        }, {} as Record<string, string>)
    ).toString();
}