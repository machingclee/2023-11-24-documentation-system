export default <T,>(dataRef: React.MutableRefObject<T>) => {
    const fieldUpdate = (update: Partial<T>) => {
        dataRef.current = { ...dataRef.current, ...update };
    }
    return { fieldUpdate }
}