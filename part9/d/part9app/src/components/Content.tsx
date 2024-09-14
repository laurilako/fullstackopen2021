import type { CoursePart } from '../types';
import { Part } from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((part, i) => <Part key={i} part={part} />)}
        </div>
    );
};

export { Content };