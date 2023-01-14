/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Tag from '@/components/Tag';

const tags = {
    featured: () => {
        const tag = { name: 'Featured' };
        return <Tag className="bg-[#00850D] text-[#fff]" tag={tag} />;
    },
    collab: () => {
        const tag = { name: 'Collaborative' };
        return <Tag className="bg-[#2929FF] text-[#fff]" tag={tag} />;
    },
};

export default tags;
