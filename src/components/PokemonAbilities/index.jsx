function PokemonAbilities({ abilities }) {
    return (
        <div className="flex flex-row items-center justify-center space-x-2 my-4">
            {abilities.map((ability) => (
                <span
                    key={ability}
                    className="capitalize inline-flex items-center rounded-md bg-slate-100 text-slate-600 px-2.5 py-0.5 text-sm font-base"
                >
                    {ability}
                </span>
            ))}
        </div>
    );
}

export default PokemonAbilities;
