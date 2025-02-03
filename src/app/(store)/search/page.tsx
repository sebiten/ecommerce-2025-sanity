

export default async function Search({
    searchParams, }: {
        searchParams: {
            query: string;
        };
    }
) {
    const { query } = await searchParams;
    return (
        <div>{query}</div>
    )
}
