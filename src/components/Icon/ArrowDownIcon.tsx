import { IconType } from "src/types/icon.types";

const ArrowDownIcon = ({ kind = "primary", width = 11, height = 10, fill = "#3B3E44", className }: IconType) => {
  if (kind === "primary") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M9.7194 0.279313C9.54166 0.100415 9.30123 0 9.05062 0C8.80001 0 8.55958 0.100415 8.38184 0.279313L4.97628 3.67957L1.61816 0.279313C1.44042 0.100415 1.19999 0 0.94938 0C0.698767 0 0.458337 0.100415 0.280601 0.279313C0.191688 0.368606 0.121116 0.474841 0.0729554 0.59189C0.0247951 0.708939 0 0.834485 0 0.961285C0 1.08809 0.0247951 1.21363 0.0729554 1.33068C0.121116 1.44773 0.191688 1.55396 0.280601 1.64326L4.30276 5.71588C4.39095 5.80591 4.49587 5.87736 4.61147 5.92613C4.72706 5.97489 4.85105 6 4.97628 6C5.10151 6 5.2255 5.97489 5.3411 5.92613C5.4567 5.87736 5.56162 5.80591 5.64981 5.71588L9.7194 1.64326C9.80831 1.55396 9.87888 1.44773 9.92704 1.33068C9.9752 1.21363 10 1.08809 10 0.961285C10 0.834485 9.9752 0.708939 9.92704 0.59189C9.87888 0.474841 9.80831 0.368606 9.7194 0.279313Z"
          fill={fill}
        />
      </svg>
    );
  }
  if (kind === "secondary") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.93248 0C9.3564 0 9.58798 0.494429 9.31659 0.820092L5.38411 5.53907C5.18421 5.77894 4.81579 5.77894 4.61589 5.53907L0.683409 0.820091C0.412023 0.494428 0.643602 0 1.06752 0L8.93248 0Z"
          fill={fill}
        />
      </svg>
    );
  }
  return null;
};

export default ArrowDownIcon;
