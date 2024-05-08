import TooltipContainer from "@/components/shared/TooltipContainer";

interface SkillItemProps {
    skillName: string;
    expertise: string;
};

const SkillItem: React.FC<SkillItemProps> = ({ skillName, expertise }) => {
    return (
        <TooltipContainer content={String(expertise)?.charAt(0).toUpperCase() + String(expertise).slice(1).toLowerCase()} >
            <div className="py-2 px-3 rounded-md text-sm border transition-all border-slate-300 flex items-center gap-x-1 hover:border-sky-700 select-none" >
                {skillName}
            </div>
        </TooltipContainer>
    );
};

export default SkillItem;