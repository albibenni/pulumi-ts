import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

type MyBucketFirstExampleArgs = {
  bucketName: string;
  product: string;
  public?: boolean;
};

export class MyBucketFirstExample extends pulumi.ComponentResource {
  constructor(
    args: MyBucketFirstExampleArgs,
    opts?: pulumi.CustomResourceOptions,
  ) {
    const resourceName = `${args.product}-${args.bucketName}`;

    super("my:bucket:MyBucketFirstExample", resourceName, {}, opts);

    const stack = pulumi.getStack();

    const bucketName = `${resourceName}-${stack}`;

    const bucketArgs: aws.s3.BucketArgs = {
      acl: "private",
      bucket: bucketName,
      tags: {
        Environment: stack,
      },
    };
    if (args.public) {
      bucketArgs.acl = "public-read";
      bucketArgs.website = {
        indexDocument: "index.html",
        errorDocument: "error.html",
        routingRules: `[{
                    "Condition": {
                    "KeyPrefixEquals": "docs/"
                    },
                    "Redirect": {
                    "ReplaceKeyPrefixWith": "document/"
                    }
                }]`,
      };
    }

    const bucketExample = new aws.s3.Bucket(
      args.bucketName, // pulumi name
      bucketArgs,
      {
        parent: this,
      },
    );

    if (!args.public) {
      new aws.s3.BucketPublicAccessBlock(
        args.bucketName,
        {
          bucket: bucketExample.id,
          blockPublicAcls: true,
          blockPublicPolicy: true,
          ignorePublicAcls: true,
          restrictPublicBuckets: true,
        },
        {
          parent: this,
        },
      );
    }
  }
}
