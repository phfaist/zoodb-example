# Example Zoo Using ZooDb

In this repository we have a very simple illustrative example of a usage of our
[ZooDb framework](https://github.com/phfaist/zoodb)
for building a modest-scale database, or "Zoo," to organize a collection of
objects or concepts in a semi-structured form.

In this example, the ZooDb database is used to store a database of people with
parent/child and friend relationships.  The source data providing the content
of the database is a collection of YAML files.
YAML is a common and useful markup language to store structured data.
You can [google "YAML tutorial"](https://google.com/search?q=YaML+tutorial)
or check out the language's [Wikipedia
page](https://en.wikipedia.org/wiki/YAML).)

The database object schemas are in `schemas/`.  The schemas define what exactly
is being stored in the database.

The data, provided in YAML files, is in the folder `data/`.

Minimal JS code to load the people DB in memory is in `peopledbjs/`.  If you want
to produce any different form of output, e.g., a handbook or print form of the
database, then you can use this code to load the database in memory and use it
to generate the required output.

A simple example static website, generated with the given data, is
in `website/`.  The website
is powered by [11ty](https://11ty.dev/) and [parcel](https://parceljs.org/).

**To build the website:** refer to the [README](website/README.md) file
in the folder `website/` folder. 

See also [the documentation for the ZooDB
package](https://zoodb.readthedocs.org/).
