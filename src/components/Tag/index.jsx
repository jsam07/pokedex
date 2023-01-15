/* eslint-disable react/jsx-no-useless-fragment */
function Tag({ className, tag }) {
    return (
        <span
            className={`inline-flex items-center mr-2 my-1 mt-4 px-2 py-[0.16rem] rounded text-xs ${className}`}
        >
            {`${tag.icon || ''} ${tag.name}`}
        </span>
    );
}

export default Tag;
