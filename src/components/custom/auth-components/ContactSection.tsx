import { Separator } from "@/components/ui/separator";
import { CardFooter } from "@/components/ui/card";
import facebookIcon from "@/assets/icons-facebook.png";
import igIcon from "@/assets/icons-ig.png";
import lineIcon from "@/assets/icons-line.png";
import youtubeIcon from "@/assets/icons-youtube.png";
import SocialLink from "./SocialLink";

interface ContactSectionProps {
  showSocials?: boolean;
  websiteUrl?: string;
}

export default function ContactSection({
  showSocials = true,
  websiteUrl = "https://www.bluestone.co.th/",
}: ContactSectionProps) {
  return (
    <>
      <Separator className="my-2" />
      <CardFooter className="flex flex-col space-y-4 pt-2">
        <p className="text-sm text-center">Contact Us</p>

        {showSocials && (
          <div className="flex justify-center space-x-10">
            <SocialLink
              url="https://www.facebook.com/Bluestone.co.th/"
              icon={facebookIcon}
              altText="Facebook"
            />
            <SocialLink
              url="https://www.instagram.com/bluestone.co.th"
              icon={igIcon}
              altText="Instagram"
            />
            <SocialLink
              url="https://line.me/R/ti/p/@coa2199t?oat_content=url"
              icon={lineIcon}
              altText="Line"
            />
            <SocialLink
              url="https://www.youtube.com/@bluestone.official"
              icon={youtubeIcon}
              altText="YouTube"
            />
          </div>
        )}

        {websiteUrl && (
          <a
            href={`http://${websiteUrl}`}
            className="text-xs text-blue-500 text-center underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {websiteUrl.slice(0, -1)} {/* Remove trailing slash */}
          </a>
        )}
      </CardFooter>
    </>
  );
}
