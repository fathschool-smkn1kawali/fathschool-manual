import { GetTime, SayHello } from "@/lib/utils/moment";
import { Icons } from "@/resource";
import { Chip } from "@nextui-org/react";
import { Actions } from "./Actions";

/**
 * This is a strongly typed React Functional Component that renders a hero
 * section. It takes no props and returns a React.ReactElement.
 *
 * @returns {React.ReactElement} A Hero component.
 */
export const Hero = ({ greeting: { nameUser, description }, actions: { In, Out } }: Props): React.ReactElement => {

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 py-28">

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Chip startContent={<Icons.CalendarClock />} variant="flat" color="primary" classNames={{ content: "px-2", base: "px-4" }}>
              <span>{GetTime()}</span>
            </Chip>
            <Chip startContent={<Icons.Info />} variant="flat" color={!In && !Out ? "warning" : "success"} classNames={{ content: "px-2", base: "px-4" }}>
              <span>
                {In && !Out && "Anda sudah Check In"}
                {Out && In && "Anda sudah Check Out"}
                {!In && !Out && "Anda belum Check In"}
              </span>
            </Chip>
          </div>

          <div className="my-4 sm:my-6">
            <h2 className="sm:w-5/6 lg:w-3/4 mx-auto line-clamp-2">{SayHello()} {nameUser}</h2>
          </div>
          <p className="sm:w-4/6 lg:w-3/5 mx-auto">
            {description ?? 'Bagi siswa dan guru yang tidak dapat menggunakan fitur biometrik dapat menggunakan fitur ini. Pastikan aktifasi lokasi sudah sesuai dengan area di sekolah.'}
          </p>
        </div>

        <Actions checkIn={In} checkOut={Out} />
      </div>
    </section>
  );
};


type Props = {
  actions: {
    In: boolean;
    Out: boolean;
  }
  greeting: {
    nameUser: string;
    description: string;
  };
}