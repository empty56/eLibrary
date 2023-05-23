package com.diploma.elibrary.service.interfaces;

import com.diploma.elibrary.model.Link;

import java.util.List;

public interface LinkService {

    List<Link> getLinks(Long book_id);
    Link createLink(Link link);
    Link updateLink(Long id, Link linkDetails);
    void deleteLink(Long id);
}
