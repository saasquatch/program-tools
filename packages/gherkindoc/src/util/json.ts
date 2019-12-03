import * as moment from "moment";

import { parse } from "./parser";
import { version } from "../../package.json";

export async function generate(files: string[]): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const stream = parse(files);

    const json = {
      features: [],
      summary: {
        tags: [],
        folders: [],
        notTestedFolders: [],
        scenarios: {
          total: 0,
          passing: 0,
          failing: 0,
          inconclusive: 0
        },
        features: {
          total: 0,
          passing: 0,
          failing: 0,
          inconclusive: 0
        }
      },
      configuration: {
        version,
        program: "gherkindoc",
        generatedOn: moment().format(),
        generatedOnTimestamp: moment().valueOf()
      }
    };

    stream.on("data", (chunk: any) => {
      const feature = chunk.gherkinDocument.feature;

      const tmp = {
        relativeFolder: chunk.gherkinDocument.uri,
        feature: {
          name: feature.name,
          description: feature.description,
          featureElements: [],
          tags: feature.tags.map((tag: any) => tag.name),
          result: {
            wasExecuted: false,
            wasSuccessful: false,
            wasProvided: false
          }
        },
        result: {
          wasExecuted: false,
          wasSuccessful: false,
          wasProvided: false
        }
      };

      const comments = chunk.gherkinDocument.comments;

      feature.children.forEach((child: any) => {
        const element = child.rule
          ? child.rule
          : child.background
          ? child.background
          : child.scenario;

        json.summary.scenarios.total += 1;
        json.summary.scenarios.inconclusive += 1;

        const examples = element.examples
          ? element.examples.map((example: any) => {
              const commentsFound = commentCrawler(
                comments,
                example.location.line
              );
              return processExample(example, commentsFound);
            })
          : [];

        const elementType = child.rule
          ? "Rule"
          : child.background
          ? "Background"
          : examples.length > 0
          ? "Scenario Outline"
          : "Scenario";

        const steps = element.steps
          ? element.steps.map((step: any) => {
              const commentsFound = commentCrawler(
                comments,
                step.location.line
              );
              return processStep(step, commentsFound);
            })
          : [];

        const commentsFound = commentCrawler(comments, element.location.line);

        tmp.feature.featureElements.push({
          steps,
          examples,
          elementType,
          name: element.name,
          description: element.description || "",
          tags: element.tags ? element.tags.map((tag: any) => tag.name) : [],
          result: {
            wasExecuted: false,
            wasSuccessful: false,
            wasProvided: false
          },
          beforeComments: commentsFound.before,
          afterComments: commentsFound.after
        });
      });

      json.features.push(tmp);
      json.summary.features.total += 1;
      json.summary.features.inconclusive += 1;
    });

    stream.on("error", (err: any) => {
      reject(err);
    });

    stream.on("finish", () => {
      resolve(json);
    });
  });
}

const commentCrawler = (comments: any, startingIndex: any) => {
  let currentIndex = startingIndex;

  const ret = {
    before: [],
    after: []
  };

  let element;
  // prettier-ignore
  // eslint-disable-next-line no-cond-assign
  while (element = comments.find((c: any)=> c.location.line === currentIndex - 1)) {
    ret.before.push(element.text.trim());
    currentIndex--;
  }

  currentIndex = startingIndex;

  // prettier-ignore
  // eslint-disable-next-line no-cond-assign
  while (element = comments.find((c: any)=> c.location.line === currentIndex + 1)) {
    ret.after.push(element.text.trim());
    currentIndex++;
  }

  return ret;
};

function processStep(step: any, comments: any): any {
  const stepObj = {
    keyword: step.keyword.trim(),
    rawKeyword: step.keyword,
    text: step.text,
    beforeComments: comments.before,
    afterComments: comments.after,
    docString: step.docString,
    dataTable: []
  };

  if (step.dataTable) {
    stepObj.dataTable = step.dataTable.rows.map((row: any) => {
      return row.cells.map((cell: any) => cell.value);
    });
  }

  return stepObj;
}

function processExample(example: any, comments: any): any {
  const exampleObj = {
    header: example.tableHeader.cells.map((cell: any) => cell.value),
    data: example.tableBody.map((e: any) =>
      e.cells.map((cell: any) => cell.value)
    ),
    beforeComments: comments.before,
    afterComments: comments.after
  };

  return exampleObj;
}
