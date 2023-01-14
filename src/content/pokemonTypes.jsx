/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Tag from '@/components/Tag';

const tags = {
    normal: () => {
        const tag = { name: 'Normal' };
        return <Tag className="bg-[#A8A77A] text-[#fff]" tag={tag} />;
    },
    fire: () => {
        const tag = { name: 'Fire' };
        return <Tag className="bg-[#EE8130] text-[#fff]" tag={tag} />;
    },
    water: () => {
        const tag = { name: 'Water' };
        return <Tag className="bg-[#6390F0] text-[#fff]" tag={tag} />;
    },
    electric: () => {
        const tag = { name: 'Electric' };
        return <Tag className="bg-[#F7D02C] text-[#fff]" tag={tag} />;
    },
    grass: () => {
        const tag = { name: 'Grass' };
        return <Tag className="bg-[#7AC74C] text-[#fff]" tag={tag} />;
    },
    ice: () => {
        const tag = { name: 'Ice' };
        return <Tag className="bg-[#96D9D6] text-[#fff]" tag={tag} />;
    },
    fighting: () => {
        const tag = { name: 'Fighting' };
        return <Tag className="bg-[#C22E28] text-[#fff]" tag={tag} />;
    },
    poison: () => {
        const tag = { name: 'Poison' };
        return <Tag className="bg-[#A33EA1] text-[#fff]" tag={tag} />;
    },
    ground: () => {
        const tag = { name: 'Ground' };
        return <Tag className="bg-[#E2BF65] text-[#fff]" tag={tag} />;
    },
    flying: () => {
        const tag = { name: 'Flying' };
        return <Tag className="bg-[#A98FF3] text-[#fff]" tag={tag} />;
    },
    psychic: () => {
        const tag = { name: 'Psychic' };
        return <Tag className="bg-[#F95587] text-[#fff]" tag={tag} />;
    },
    bug: () => {
        const tag = { name: 'Bug' };
        return <Tag className="bg-[#A6B91A] text-[#fff]" tag={tag} />;
    },
    rock: () => {
        const tag = { name: 'Rock' };
        return <Tag className="bg-[#B6A136] text-[#fff]" tag={tag} />;
    },
    ghost: () => {
        const tag = { name: 'Ghost' };
        return <Tag className="bg-[#735797] text-[#fff]" tag={tag} />;
    },
    dragon: () => {
        const tag = { name: 'Dragon' };
        return <Tag className="bg-[#6F35FC] text-[#fff]" tag={tag} />;
    },
    dark: () => {
        const tag = { name: 'Dark' };
        return <Tag className="bg-[#705746] text-[#fff]" tag={tag} />;
    },
    steel: () => {
        const tag = { name: 'Steel' };
        return <Tag className="bg-[#B7B7CE] text-[#fff]" tag={tag} />;
    },
    fairy: () => {
        const tag = { name: 'Fairy' };
        return <Tag className="bg-[#D685AD] text-[#fff]" tag={tag} />;
    },
};

export default tags;
