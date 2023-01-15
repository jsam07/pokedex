/* eslint-disable react/jsx-no-useless-fragment */
function Tag({ className, tag }) {
    return (
        <span
            className={`inline-flex items-center px-2 py-[0.16rem] rounded text-xs ${className}`}
        >
            {`${tag.icon || ''} ${tag.name}`}
        </span>
    );
}

export default Tag;
