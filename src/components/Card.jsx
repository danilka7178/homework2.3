function Card({ name, email }) {
   return (
      <li className="user__item">
         <div className="user__name">{name}</div>
         <div className="user__email">{email}</div>
      </li>
   )
};

export default Card;
