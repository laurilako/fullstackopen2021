import type { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case 'basic':
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </div>
            );
        case 'group':
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Group project count: {part.groupProjectCount}</p>
                </div>
            );
        case 'background':
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Background material: {part.backgroundMaterial}</p>
                </div>
            );
        case 'special':
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercise count: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Requirements: {part.requirements.join(', ')}</p>
                </div>
            );
        default:
            return null;
    }
};

export { Part };