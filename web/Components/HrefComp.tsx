interface HrefCompProps {
  label: string;
  hrefLink: string;
  styles: string;
}

export const HrefComp: React.FC<HrefCompProps> = ({label, hrefLink, styles}) => {
  return (<a className={styles} href={hrefLink}>{label}</a>)
}