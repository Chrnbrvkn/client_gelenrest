import humanIcon from "../../../assets/images/icons/houses-icons/man.svg";

export default function HumanIcons({ item }) {
  const humanCount = item.roomCount > 4 ? 4 : item.roomCount;

  return (
    <div className="apart__item-man--items">
      {Array.from({ length: humanCount }, (_, index) => (
        <div key={index} className="apart__item-man">
          <img src={humanIcon} alt="humanIcon" />
        </div>
      ))}
      {item.roomCount > 4 && <span>+</span>}
    </div>
  );
}
