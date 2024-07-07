"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Plus from "../../public/assets/Plus.svg";
import Image from "next/image";

const items = [
  {
    question: "How does the travel itinerary generation work?",
    answer:
      "Simply enter your departure and arrival dates along with your desired location. Our system will use OpenAI to generate a detailed travel itinerary for you, including activities, places to eat, and visit, as well as weather information.",
  },
  {
    question: "Can I customize my itinerary?",
    answer:
      "Yes, after receiving your generated itinerary, you can customize it by adding or removing activities, changing dining options, and more to fit your preferences.",
  },
  {
    question: "Is the weather information accurate?",
    answer:
      "We use reliable weather APIs to provide up-to-date weather forecasts for your travel dates. However, please note that weather can be unpredictable, and we recommend checking the weather closer to your departure date.",
  },
  {
    question: "Can I save and share my itinerary?",
    answer:
      "Absolutely! Once your itinerary is generated, you can save it to your account for future reference. You can also share your itinerary with friends and family via email or social media.",
  },
  {
    question: "Do I need to create an account to use the service?",
    answer:
      "You can generate an itinerary without creating an account. However, having an account allows you to save, edit, and share your itineraries easily.",
  },
];

export function Faq() {
  return (
    <div className="flex flex-col w-full py-[48px] lg:py-[60px] lg:flex-row lg:gap-x-6">
      <div className="lg:w-1/3 lg:py-[32px] lg:pr-[56px]">
        <h3 className="text-[#EB2891] text-[14px] font-medium lg:text-base">
          Frequently Asked Questions
        </h3>
        <h1 className="py-4 text-2xl font-medium text-[#172026] lg:text-[42px] lg:leading-[58px]">
          Let’s clarify some of your questions
        </h1>
        <p className="text-[#36485C] pb-[24px]">
          Here are some common questions and answers to help you get the most out of our travel itinerary service.
        </p>
      </div>

      <div className="lg:w-2/3">
        <Accordion.Root
          type="single"
          defaultValue="item-1"
          collapsible
          className="flex flex-col gap-y-4"
        >
          {items.map((item, index) => (
            <div key={index}>
              <Accordion.Item
                value={`item-${index + 1}`}
                className="bg-[#E3F1FF] p-[16px] rounded-[8px]"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between">
                    <p className="text-left font-medium text-[#172026] lg:text-[18px]">
                      {item.question}
                    </p>
                    <span>
                      <Image
                        src={Plus}
                        alt="See more"
                        className="h-10 w-10 lg:w-6 lg:h-6"
                      />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content>
                  <p className="pt-2 text-[#36485C]">{item.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            </div>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
}
