const statsFormat = {
    hp: { display: 'HP', short: 'HP ' },
    attack: { display: 'Attack', short: 'ATK' },
    defense: { display: 'Defense', short: 'DEF' },
    'special-attack': { display: 'Special Attack', short: 'SpA' },
    'special-defense': { display: 'Special Defense', short: 'SpD' },
    speed: { display: 'Speed', short: 'SPD' },
};

const formatStat = (name) => {
    return statsFormat[name].short;
};

function Stat({ stat }) {
    return (
        <div
            className={`flex flex-col items-center justify-center bg-slate-100 rounded-t-3xl rounded-b-xl p-1 text-${stat.name} shadow-sm`}
        >
            <div
                className={`bg-${stat.name} rounded-full p-2 text-white font-medium`}
            >
                {formatStat(stat.name)}
            </div>
            <div className="px-2 pb-1">{stat.score}</div>
        </div>
    );
}

export default Stat;
