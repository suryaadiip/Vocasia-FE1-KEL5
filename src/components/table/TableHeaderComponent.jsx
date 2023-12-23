export default function TableHeaderComponent({className, titles}) {
  return (
    <tr className={className}>
      {titles.map((title) => (
        <th>{title}</th>
      ))}
    </tr>
  );
}