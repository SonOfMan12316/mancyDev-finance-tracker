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
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setScreenSize("lg");
      } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
        setScreenSize("xl");
      } else {
        setScreenSize("2xl");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        if (currentPage === 1) {
          if (i === 1 || i === 2 || i === numPages) {
            pageNumbers.push(
              <Button
                onClick={() => handleClick(i)}
                className={`${
                  i === currentPage ? "bg-ch-black text-white" : ""
                } px-3.5`}
                size="sm"
                variant="pagination"
                key={i}
              >
                {i}
              </Button>
            );
          } else if (i === 3 && !dotsEnd) {
            pageNumbers.push(
              <Button
                className="px-3"
                key="dots"
                size="sm"
                variant="pagination"
                disabled
              >
                ...
              </Button>
            );
            dotsEnd = true;
          }
        } else if (currentPage === 2) {
          if (i === 1 || i === 2 || i === numPages) {
            pageNumbers.push(
              <Button
                onClick={() => handleClick(i)}
                className={`${
                  i === currentPage ? "bg-ch-black text-white" : ""
                } px-3.5`}
                size="sm"
                variant="pagination"
                key={i}
              >
                {i}
              </Button>
            );
          } else if (i === 4 && !dotsEnd) {
            pageNumbers.push(
              <Button
                className="px-3"
                key="dots"
                size="sm"
                variant="pagination"
                disabled
              >
                ...
              </Button>
            );
            dotsEnd = true;
          }
        } else if (currentPage === numPages) {
          // Last page: show 1, ..., secondLast, lastPage
          if (i === 1 || i === numPages - 1 || i === numPages) {
            pageNumbers.push(
              <Button
                onClick={() => handleClick(i)}
                className={`${
                  i === currentPage ? "bg-ch-black text-white" : ""
                } px-3.5`}
                size="sm"
                variant="pagination"
                key={i}
              >
                {i}
              </Button>
            );
          } else if (i === 2 && !dotsStart) {
            pageNumbers.push(
              <Button
                className="px-3"
                key="dots"
                size="sm"
                variant="pagination"
                disabled
              >
                ...
              </Button>
            );
            dotsStart = true;
          }
        } else {
          // Middle pages: show 1, ..., current, lastPage
          if (i === 1 || i === currentPage || i === numPages) {
            pageNumbers.push(
              <Button
                onClick={() => handleClick(i)}
                className={`${
                  i === currentPage ? "bg-ch-black text-white" : ""
                } px-3.5`}
                size="sm"
                variant="pagination"
                key={i}
              >
                {i}
              </Button>
            );
          } else if (i === 2 && !dotsStart) {
            pageNumbers.push(
              <Button
                className="px-3"
                key="dots"
                size="sm"
                variant="pagination"
                disabled
              >
                ...
              </Button>
            );
            dotsStart = true;
          }
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
              variant="pagination"
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
    <div className="w-full mt-8 mb-1">
      <div className="flex items-center justify-between gap-x-2">
        <div className="">
          <Button
            onClick={handlePrevClick}
            className="md:px-4 rounded-lg"
            variant="pagination"
            size="sm"
            placement="start"
            icon={<CaretLeft />}
            disabled={currentPage === 1}
          >
            <p className="hidden md:block">Prev</p>
          </Button>
        </div>
        <div className="flex  space-x-2">{renderPageNumbers()}</div>
        <div className="">
          <Button
            onClick={handleNextClick}
            className="md:px-4 rounded-lg "
            variant="pagination"
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
