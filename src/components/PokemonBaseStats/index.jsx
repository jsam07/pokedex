import Stat from '../Stat';

/* eslint-disable react/jsx-no-useless-fragment */
const sumStats = (stats) => {
    return stats.reduce((sum, stat) => sum + stat.score, 0);
};
function PokemonBaseStats({ stats }) {
    return (
        <div className="flex flex-col mt-4 items-center justify-center space-y-4">
            <div className="flex flex-row space-x-2">
                {stats.map((stat) => (
                    <Stat key={stat.name} stat={stat} />
                ))}
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg bg-white p-2 shadow">
                <dt className="truncate text-sm font-medium text-gray-400">
                    Total
                </dt>
                <dd className="mt-1  text-3xl font-semibold tracking-tight text-gray-900">
                    {sumStats(stats)}
                </dd>
            </div>
        </div>
    );
}

export default PokemonBaseStats;
