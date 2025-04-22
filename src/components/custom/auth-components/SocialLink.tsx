interface SocialLinkProps {
  url: string;
  icon: string;
  altText?: string;
}

export default function SocialLink({ url, icon, altText }: SocialLinkProps) {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <div className="w-10 rounded-full flex items-center justify-center">
          <img src={icon} alt={altText || "Social media icon"} />
        </div>
      </a>
    );
  }