import "./Menu.css";

interface MenuProps {
  onReturn: () => void;
  isActive: boolean;
}

export const Menu = ({ onReturn, isActive }: MenuProps) => {
  return (
    <div
      className={
        isActive
          ? "absolute flex w-full h-full items-center z-10 flex-col"
          : "hidden"
      }
    >
      <div className="max-w-[480px] h-full w-full flex flex-col bg-[#ddd] p-[12px]">
        <div className="flex-1 overflow-y-auto">
          <h2 className="w-full text-[32px] mb-[6px] font-bold bg-[#ddd]">
            About Perudo
          </h2>
          <p className="mb-[12px]">
            Perudo, also known as Dudo or Liar's Dice, is a classic dice game of
            strategy, bluffing, and deduction. It dates back to the Inca Empire
            of the 15th century, making it a timeless game.
          </p>
          <p className="mb-[12px]">
            Want to play Perudo, but don't have any dice on hand? No problem!
            Each player navigates to peru.do on their mobile phone and the game
            can start!
          </p>

          <h2 className="w-full text-[32px] mb-[6px] font-bold bg-[#ddd]">
            How to Play Perudo
          </h2>
          <p className="mb-[12px]">
            Perudo is played with 2 to 6 players, each starting with 5 dice. The
            game begins with all players rolling their dice in secret, keeping
            the results hidden from opponents.
          </p>

          <h3 className="text-[20px] mb-[12px] font-bold">Bidding Rules</h3>
          <p className="mb-[12px]">
            The first player makes a bid, guessing how many dice of a specific
            value are in play across all players' dice. For example, a bid might
            be "<b>three fives</b>." Here's the catch:
          </p>
          <ul className="mb-[12px] list-disc pl-[20px]">
            <li>
              Ones (or Aces, indicated by a{" "}
              <span className="text-[28px] leading-4 align-sub">𖦹</span> on
              peru.do) are <b>wild</b>. They count as the current bid value. If
              the bid is "three fives," a roll of two fives and one Ace is
              valid.
            </li>
            <li>
              Once a bid is made, the next player can either raise the bid or
              challenge it.
            </li>
          </ul>

          <h3 className="text-[20px] mb-[12px] font-bold">
            How to Raise a Bid
          </h3>
          <p className="mb-[12px]">
            To raise a bid, a player must either increase the quantity of dice
            (e.g., "<b>four fives</b>") or increase the value (e.g., "
            <b>three sixes</b>"), or both. Note that if the player increases the
            amount, he or she is allowed to decrease the value. Aces can also be
            bid:
          </p>
          <ul className="mb-[12px] list-disc pl-[20px]">
            <li>
              If bidding Aces, the quantity can be halved. For instance, "two
              Aces" can follow a bid of "four sixes."
            </li>
            <li>
              After an Ace bid, returning to a regular value requires doubling
              the Aces plus one. For example, "five fours" can follow "two
              Aces."
            </li>
          </ul>

          <h3 className="text-[20px] mb-[12px] font-bold">
            Dudo: The Challenge
          </h3>
          <p className="mb-[12px]">
            Instead of raising the bid, a player can challenge the previous bid
            by saying "<b>Dudo</b>!" This initiates a showdown where all players
            reveal their dice:
          </p>
          <ul className="mb-[12px] list-disc pl-[20px]">
            <li>
              If the bid was accurate (i.e., there are at least as many dice as
              stated), the challenger loses a die.
            </li>
            <li>If the bid was inaccurate, the bidder loses a die.</li>
          </ul>
          <p className="mb-[12px]">
            The next round begins with the player who lost a die starting the
            new bid.
          </p>

          <h3 className="text-[20px] mb-[12px] font-bold">Exact Call: Calza</h3>
          <p className="mb-[12px]">
            A player can also declare "<b>Calza</b>" if they believe the bid is{" "}
            <b>exactly correct</b>. Note that Calza can be called by any player
            at any moment, except after one's own bid. All dice are revealed:
          </p>
          <ul className="mb-[12px] list-disc pl-[20px]">
            <li>
              If the bid is precise, the player gains a die (up to a maximum of
              five).
            </li>
            <li>If the bid is incorrect, the player loses a die.</li>
          </ul>
          <p className="mb-[12px]">
            Whether the bid was exact or not, a new round begins with the player
            who gained or lost a die making the next bid.
          </p>

          <h3 className="text-[20px] mb-[12px] font-bold">
            Last die: Palafico
          </h3>
          <p className="mb-[12px]">
            When a player is down to their last die, the game enters a special
            round called "<b>Palafico</b>":
          </p>
          <ul className="mb-[12px] list-disc pl-[20px]">
            <li>Aces are no longer wild.</li>
            <li>Bids can only increase the quantity of dice, not the value.</li>
          </ul>
          <p className="mb-[12px]">
            If a player loses their final die, they are out of the game. The
            last player with any dice remaining is declared the winner.
          </p>
        </div>
        <div className="sticky bottom-0 bg-[#ddd]">
          <button onClick={onReturn}>Play perudo!</button>
        </div>
      </div>
    </div>
  );
};
