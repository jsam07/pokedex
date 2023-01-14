/* eslint-disable react/jsx-no-useless-fragment */
function Tag({ className, tag }) {
    return (
        <div
            className={`inline-flex items-center mr-2 my-1 px-4 py-0.5 rounded text-xs ${className}`}
        >
            {tag.name}
        </div>
    );
}

export default Tag;
