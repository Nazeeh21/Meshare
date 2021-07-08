interface HrefCompProps {
  label: string;
  hrefLink: string;
  styles?: string;
}

export const HrefComp: React.FC<HrefCompProps> = ({
  label,
  hrefLink,
  styles = 'cursor-pointer inline-block font-bold',
}) => {
  return (
    <a target="_" className={styles} href={hrefLink}>
      {label}
    </a>
  );
};
