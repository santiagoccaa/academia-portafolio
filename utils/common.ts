export const preGenerateObjectId = (): string => {
    const uniqueId = (
        Date.now().toString(16) + // timestamp for basic uniqueness
        Math.random().toString(16).slice(2, 8)
    ) // 6 random chars
        .toLowerCase();

    // IMPORTANT Backend is expecting this format.
    return `preId_${uniqueId}`;
};

export const countCharacteres = (text: string): number => {
    return text.trim().length
}

export const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    return `${h}h ${m}m ${s}s`
}