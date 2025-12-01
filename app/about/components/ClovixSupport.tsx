import Image from "next/image";

import { WhatsAppOutlined } from "@ant-design/icons";

function ClovixSupport() {
  return (
    <div className="w-full bg-[#FCFCFC] py-6 px-5 border border-y border-[#DBDBDB] mt-4">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
        <div className="flex items-center space-x-4 text-left">
          <Image
            src="/images/care.svg"
            alt="Plane Icon"
            width={48}
            height={48}
          />
          <div>
            <h4 className="text-black text-lg sm:text-xl font-medium">
              24/7 Customer Support
            </h4>
            <p className="text-black text-sm font-normal font-poppins max-w-[480px] text-wrap mt-1">
              Speak to Customer Support expert for any query or information
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap lg:ml-40 xl:ml-6 justify-start sm:justify-center lg:justify-start gap-x-4 gap-y-2 text-black text-[12px] sm:text-sm font-poppins">
          <div className="w-full sm:w-auto flex items-center justify-start space-x-2">
            <WhatsAppOutlined className="text-black  md:text-xl sm:text-lg text-lg" />
            <a
              href="https://api.whatsapp.com/send?phone=11234567890"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat with us on WhatsApp"
              className="text-black no-underline cursor-pointer sm:text-base text-[13px] flex md:gap-[0.84rem] gap-3"
            >
              Whatsapp{" "}
              <p className="text-black text-base font-medium">
                +1 123 456-7890
              </p>
            </a>
          </div>
          <div className="hidden xl:inline-block w-px h-5 bg-black align-middle" />
          <div className=" w-full sm:w-auto flex items-center sm:justify-center justify-start items-left space-x-2 mt-2 sm:mt-0">
            <Image
              src="/icons/ion_call.svg"
              alt="call icon"
              width={0}
              height={0}
              className="sm:rotate-[133] w-4 sm:w-4 md:w-6 h-auto"
            />
            <a
              href="tel:+9647867367322"
              title="Call our customer support"
              className="text-black no-underline cursor-pointer sm:text-base text-[13px] flex md:gap-[0.84rem] gap-3 sm:justify-center justify-between sm:w-auto w-full "
            >
              Call
              <p className="text-black text-base font-medium">
                +1 123 456-7890
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClovixSupport;
