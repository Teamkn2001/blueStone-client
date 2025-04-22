import { Separator } from "@/components/ui/separator";
import { CardFooter } from "@/components/ui/card";
import facebookIcon from "@/assets/icons-facebook.png";
import igIcon from "@/assets/icons-ig.png";
import lineIcon from "@/assets/icons-line.png";
import youtubeIcon from "@/assets/icons-youtube.png";

interface ContactSectionProps {
  showSocials?: boolean;
  websiteUrl?: string;
}

export default function ContactSection({ 
  showSocials = true, 
  websiteUrl = "https://www.bluestone.co.th/" 
}: ContactSectionProps) {
  return (
    <>
      <Separator className="my-2" />
      <CardFooter className="flex flex-col space-y-4 pt-2">
        <p className="text-sm text-center">Contact Us</p>
        
        {showSocials && (
          <div className="flex justify-center space-x-10">
            <a href="https://www.facebook.com/Bluestone.co.th/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
              <div className="w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <img src={facebookIcon} alt="facebook icon" />
              </div>
            </a>
            <a href="https://www.instagram.com/bluestone.co.th" target="_blank" rel="noopener noreferrer"  className="text-gray-500 hover:text-pink-500">
              <div className="w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <img src={igIcon} alt="instagram icon" />
              </div>
            </a>
            <a href="https://line.me/R/ti/p/@coa2199t?oat_content=url" target="_blank" rel="noopener noreferrer"  className="text-gray-500 hover:text-green-500">
              <div className="w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <img src={lineIcon} alt="line icon" />
              </div>
            </a>
            <a href="https://www.youtube.com/@bluestone.official" target="_blank" rel="noopener noreferrer"  className="text-gray-500 hover:text-red-500">
              <div className="w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <img src={youtubeIcon} alt="youtube icon" />
              </div>
            </a>
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