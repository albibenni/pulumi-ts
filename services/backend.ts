import type { CustomResourceOptions } from "@pulumi/pulumi";
import { ComponentResource } from "@pulumi/pulumi";
import { DockerImageRepo } from "./ecr-repository";

type BackendArgs = {
  bucketName: string;
  product: string;
};

export class BackendExample extends ComponentResource {
  constructor(args: BackendArgs, opts?: CustomResourceOptions) {
    const resourceName = `${args.product}-${args.bucketName}`;

    super("pkg:index:BackendExample", resourceName, {}, opts);

    new DockerImageRepo(
      {
        bucketName: args.bucketName,
        product: args.product,
      },
      { parent: this },
    );
  }
}
