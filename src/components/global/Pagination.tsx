import React, { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "../icons";
import { Button } from "../ui/Button/Button";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const [numPages, setNumPages] = useState<number>(
    Math.ceil(totalItems / pageSize)
  );
  const [screenSize, setScreenSize] = useState<
    "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | ""
  >("");

  useEffect(() => {
    setNumPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("xs");
      } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
        setScreenSize("sm");
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setScreenSize("md");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  const handleClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= numPages) {
      onPageChange(pageNumber);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < numPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let dotsStart = false;
    let dotsEnd = false;

    for (let i = 1; i <= numPages; i++) {
      if (screenSize === "xs" || screenSize === "sm") {
        if (
          i === 1 ||
          i === numPages ||
          (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
          pageNumbers.push(
            <Button
              onClick={() => handleClick(i)}
              className={`${
                i === currentPage ? "bg-ch-black text-white" : ""
              } px-2`}
              size="sm"
              variant="action"
              key={i}
            >
              {i}
            </Button>
          );
        } else if (i < currentPage - 2 && !dotsStart) {
          pageNumbers.push(
            <Button key={`dotsStart-${i}`} size="sm" variant="action">
              ...
            </Button>
          );
          dotsStart = true;
        } else if (i > currentPage + 2 && !dotsEnd) {
          pageNumbers.push(
            <Button key={`dotsEnd-${i}`} size="sm" variant="action">
              ...
            </Button>
          );
          dotsEnd = true;
        }
      } else {
        if (i === 1 || i <= numPages) {
          pageNumbers.push(
            <Button
              className={`${
                i === currentPage ? "bg-ch-black text-white" : ""
              } px-4`}
              onClick={() => handleClick(i)}
              size="sm"
              variant="action"
              key={i}
            >
              {i}
            </Button>
          );
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className="w-full mt-4 md:mt-8">
      <div className="flex items-center justify-between gap-x-2">
        <div className="">
          <Button
            onClick={handlePrevClick}
            className="md:px-4 rounded-lg"
            variant="action"
            size="sm"
            placement="start"
            icon={<CaretLeft />}
            disabled={currentPage === 1}
          >
            <p className="hidden md:block">Prev</p>
          </Button>
        </div>
        <div className="flex md:w-4/12 xl:w-3/12 md:space-x-2">
          {renderPageNumbers()}
        </div>
        <div className="">
          <Button
            onClick={handleNextClick}
            className="md:px-4 rounded-lg "
            variant="action"
            size="sm"
            placement="end"
            icon={<CaretRight />}
            disabled={currentPage === numPages}
          >
            <span className="hidden md:block">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
