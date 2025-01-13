import { GetTime, SayHello } from "@/lib/utils/moment";
import { Icons } from "@/resource";
import { Chip } from "@nextui-org/react";
import { JSX } from "react";

/**
 * This is a strongly typed React Functional Component that renders a hero
 * section. It takes no props and returns a JSX.Element.
 *
 * @returns {JSX.Element} A Hero component.
 */
export const Hero = (): JSX.Element => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 py-28">
        <div className="text-center">

          <Chip startContent={<Icons.CalendarClock />} variant="flat" color="primary">
            <span className="font-semibold">{GetTime()}</span>
          </Chip>
          
          <h2 className="sm:w-5/6 lg:w-3/4 mx-auto my-4 line-clamp-2">
            {SayHello()} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className="sm:w-4/6 lg:w-3/5 mx-auto">
            Informasi Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aperiam ducimus accusantium saepe, obcaecati autem iure corporis
            impedit, et quod hic sunt vitae ab nobis itaque sint?
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4">
          <button className="btnMasuk">Masuk</button>
          <button className="btnPulang">Pulang</button>
        </div>
      </div>
    </section>
  );
};
