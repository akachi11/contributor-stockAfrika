
type Props = {
    value: number;
    max?: number;
    className?: string;
};

export default function ProgressBar({ value, max = 100, className = "" }: Props) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className={`relative h-4 w-full rounded-full bg-neutral-200 overflow-hidden ${className}`}>
            <div
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}
